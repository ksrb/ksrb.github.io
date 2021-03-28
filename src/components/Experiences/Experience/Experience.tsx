import {
  Dialog,
  DialogContent,
  Grid,
  GridProps,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React, { FC, useCallback, useMemo, useState } from "react";
import Carousel from "react-material-ui-carousel";
import History from "src/components/Experiences/History";
import { useStyles } from "src/components/Experiences/StylesProvider";
import Timeline from "src/components/Experiences/Timeline";
import Link from "src/components/Link";
import { ExperiencesGetQuery } from "src/graphql/__generated__";
import companies from "src/graphql/data/companies";
import { ExtractArrayType } from "src/types";

function renderDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}

const Experience: FC<{
  experience: ExtractArrayType<ExperiencesGetQuery["experiences"]>;
}> = ({ experience }) => {
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const handleHistoryRootClick = useCallback(() => {
    setHistoryExpanded(!historyExpanded);
  }, [historyExpanded]);

  const classes = useStyles();

  const {
    accomplishments,
    company,
    company: {
      address: { county, state },
      purpose,
      url,
    },
    endDate,
    role,
    histories,
    startDate,
    sampleWorks,
  } = experience;

  const sampleWorksThumbnails = useMemo(() => {
    if (sampleWorks.length <= 3) {
      return sampleWorks;
    }

    // Else sampleWorks.length > 3

    const sampleWorksThumbnails = sampleWorks.filter(
      ({ thumbnail }) => thumbnail,
    );

    // SampleWorks has assigned thumbnails

    if (sampleWorksThumbnails.length !== 0) {
      return sampleWorksThumbnails.length <= 3
        ? sampleWorksThumbnails
        : [...sampleWorksThumbnails].splice(0, 3);
    }

    // SampleWorks does not have assigned thumbnails
    return [...sampleWorks].splice(0, 3);
  }, [sampleWorks]);

  const [sampleWorkDialogOpen, setSampleWorkDialogOpen] = useState(false);
  const [sampleWorkSelectedId, setSampleWorkSelectedId] = useState("");

  const handleSampleWorksToggle = useCallback(
    (id: string) => {
      setSampleWorkSelectedId(id);
      setSampleWorkDialogOpen(!sampleWorkDialogOpen);
    },
    [sampleWorkDialogOpen],
  );

  return (
    <Grid item xs={12} className={classes.experience}>
      <Timeline experience={experience} />
      <div className={classes.experience_content}>
        <div className={classes.header}>
          <div className={classes.company}>
            <div className={classes.company_name}>
              <Link color="primary" href={url}>
                {company.name}
              </Link>
            </div>
            <div className={classes.company_location}>
              {county}, {state}
            </div>
          </div>
          <div className={classes.header_right}>
            <div className={classes.role}>{role}</div>
            <div className={classes.startEndDate}>
              {renderDate(startDate)} -{" "}
              {endDate ? renderDate(endDate) : "Current"}
            </div>
          </div>
        </div>

        <div className={classes.purpose}>{purpose}</div>

        <div className={classes.accomplishments}>
          <ul>
            {accomplishments.map((accomplishment, index) => (
              <li key={index}>{accomplishment}</li>
            ))}
          </ul>
        </div>

        <div
          className={clsx(
            classes.history,
            historyExpanded && classes.history__expanded,
          )}
          onClick={handleHistoryRootClick}
        >
          <div className={classes.histories}>
            {histories.map((history) => (
              <History
                key={history.id}
                history={history}
                historyParentUtilization={100}
                histories={histories}
                depth={0}
              />
            ))}
          </div>
        </div>

        <Grid className={classes.sampleWorks} container spacing={2}>
          {sampleWorksThumbnails.map(({ caption, image, id }) => (
            <Grid
              onClick={handleSampleWorksToggle.bind(undefined, id)}
              className={classes.sampleWork}
              item
              key={id}
              xs={
                Math.round(12 / sampleWorksThumbnails.length) as GridProps["xs"]
              }
            >
              <img
                className={classes.sampleWork_image}
                src={image}
                alt={caption}
              />
            </Grid>
          ))}
        </Grid>

        <Dialog
          maxWidth="md"
          open={sampleWorkDialogOpen}
          onClose={handleSampleWorksToggle}
        >
          <DialogContent>
            <Carousel
              index={sampleWorks.findIndex(
                (sampleWork) => sampleWorkSelectedId === sampleWork.id,
              )}
              animation="slide"
              autoPlay={false}
            >
              {sampleWorks.map(({ caption, image, id }) => (
                <div key={id}>
                  <img
                    className={classes.carousel_image}
                    key={id}
                    src={image}
                    alt={caption}
                  />
                  <Typography>{caption}</Typography>
                  {company.id === companies.pmat.id && (
                    <Typography variant="caption">
                      Due to the sensitive nature of the work the capabilities
                      of the application and description of the operators are
                      intentionally vague.
                    </Typography>
                  )}
                </div>
              ))}
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </Grid>
  );
};

export default Experience;
