import { Dialog, DialogContent, Grid, GridProps } from "@material-ui/core";
import clsx from "clsx";
import React, { FC, useCallback, useState } from "react";
import Carousel from "react-material-ui-carousel";
import History from "src/components/Experiences/History";
import { useStyles } from "src/components/Experiences/StylesProvider";
import Timeline from "src/components/Experiences/Timeline";
import Link from "src/components/Link";
import { ExperiencesGetQuery } from "src/graphql/__generated__";
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

  const sampleWorksThumbnails =
    sampleWorks.length > 3 ? [...sampleWorks].splice(0, 3) : sampleWorks;

  const [sampleWorkDialogOpen, setSampleWorkDialogOpen] = useState(false);
  const [sampleWorkIndex, setSampleWorkIndex] = useState(0);

  const handleSampleWorksToggle = useCallback(
    (index: number) => {
      setSampleWorkIndex(index);
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
          {sampleWorksThumbnails.map(({ caption, image, id }, index) => (
            <Grid
              onClick={handleSampleWorksToggle.bind(undefined, index)}
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
              index={sampleWorkIndex}
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
                  <div>{caption}</div>
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
