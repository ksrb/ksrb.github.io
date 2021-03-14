import { Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import clsx from "clsx";
import gsap from "gsap";
import React, {
  createElement,
  FC,
  Fragment,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useScrollElementTrackerRefCallback } from "src/components/ScrollElementTracker";
import { skillsListenerId } from "src/constants";
import { cache } from "src/graphql";
import { useSkillsGetQuery } from "src/graphql/__generated__";
import typenames from "src/graphql/typenames";
import Search from "src/icons/Search";
import theme from "src/theme";
import {
  autoCompleteTweenVars,
  meterEdgeTweenVars,
  meterNodeTweenVars,
  meterSkillTweenVars,
  toggleMapValues,
  usesBackendIdentity,
  usesBuildIdentity,
  usesFrontendIdentity,
} from "./constants";
import MeterRoot from "./MeterRoot";
import Skill, { SkillType } from "./Skill";
import { useStylesShared } from "./StylesProvider";

const Filter: FC<{ color: string }> = ({ color }) => (
  <filter id={color.substring(1)}>
    <feColorMatrix
      in="SourceGraphic"
      type="matrix"
      values=".33 .33 .33 0 0
              .33 .33 .33 0 0
              .33 .33 .33 0 0
               0   0   0  1 0"
      result="desaturate"
    />
    <feFlood floodColor={color} result="flood" />
    <feComposite
      in="desaturate"
      in2="flood"
      operator="arithmetic"
      k1="1"
      k2="0"
      k3="0"
      k4="0"
    />
  </filter>
);

const { primaryColor, trinaryColor, secondaryColor, languagesColor } = theme;

const Skills: FC = () => {
  const { data } = useSkillsGetQuery();
  const skills = useMemo(() => data?.skills ?? [], [data]);

  const [selectedSkill, setSelectedSkill] = useState<SkillType | undefined>(
    undefined,
  );

  const handleAutoCompleteChange = useCallback(
    (event, data) => setSelectedSkill(data),
    [],
  );

  const [toggles, setToggles] = useState<{ [key: string]: boolean }>({
    [typenames.Language]: true,
    [usesFrontendIdentity]: true,
    [usesBackendIdentity]: true,
    [usesBuildIdentity]: true,
  });

  const handleToggleButtonGroupOnChange = useCallback(
    (value: string) => () => {
      setToggles({ ...toggles, [value]: !toggles[value] });
    },
    [toggles],
  );

  const skillsFiltered = useMemo(
    () =>
      skills
        .filter((skill) => {
          if (!selectedSkill) {
            return true;
          }

          return skill.id === selectedSkill.id;
        })
        .filter(({ value }) => {
          if (value.__typename === typenames.Tool) {
            const identity = cache.identify(value.use)!;
            return toggles[identity];
          }

          return toggles[value.__typename as string];
        }),
    [selectedSkill, skills, toggles],
  );

  const { classesSkills, classesSkill, classesMeterRoot } = useStylesShared();

  const [showSearch, setShowSearch] = useState(false);
  const timeline = useMemo(
    () => gsap.timeline({ paused: true, yoyo: true }),
    [],
  );

  const searchRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element) {
        return;
      }
      const meterSkillElement = element;
      const meterNodeElement = element.querySelector(
        `.${classesSkill.meter_node}`,
      );
      const meterEdgeElement = element.querySelector(
        `.${classesSkill.meter_edge}`,
      );
      const autoComplete = element.querySelector(
        `.${classesSkills.autoComplete}`,
      );

      timeline.from(meterSkillElement, meterSkillTweenVars);
      timeline.from(meterNodeElement, meterNodeTweenVars);
      timeline.from(meterEdgeElement, meterEdgeTweenVars);
      timeline.from(autoComplete, autoCompleteTweenVars);
    },
    [
      classesSkill.meter_edge,
      classesSkill.meter_node,
      classesSkills.autoComplete,
      timeline,
    ],
  );

  const handleShowSearch = useCallback(() => {
    if (!showSearch) {
      setShowSearch(true);
      timeline.play();
      return;
    }

    setShowSearch(false);
    timeline.reverse();
    setSelectedSkill(undefined);
  }, [showSearch, timeline]);

  const scrollElementTrackerRef = useScrollElementTrackerRefCallback(
    skillsListenerId,
  );

  return (
    <>
      <Grid
        container
        className={classesSkills.root}
        ref={scrollElementTrackerRef}
      >
        <Grid item xs={12}>
          <div className={classesSkills.skills}>
            <div className={classesSkill.skill}>
              <div className={classesSkill.meter_edgeVertical} />
              <MeterRoot
                onClick={handleShowSearch}
                title="Search"
                classes={{
                  meter_rootContent: clsx(
                    showSearch && classesSkills.meterRootContent__selected,
                  ),
                }}
                logo={
                  <Search
                    color="primary"
                    className={clsx(
                      showSearch && classesSkills.skill_title__selected,
                    )}
                  />
                }
              >
                {toggleMapValues.map(({ logo, title, value, className }) => {
                  const selected = toggles[value];

                  return (
                    <Fragment key={value}>
                      <div
                        className={clsx(
                          classesSkill.meter_edge,
                          classesSkills.meter_edge,
                        )}
                      />
                      <MeterRoot
                        classes={{
                          meter_rootContent: clsx(
                            classesSkills[className],
                            selected &&
                              classesSkills.meterRootContent__selected,
                          ),
                        }}
                        onClick={handleToggleButtonGroupOnChange(value)}
                        logo={createElement(logo, {
                          className: clsx(
                            selected && classesSkills.skill_title__selected,
                          ),
                        })}
                        title={title}
                      >
                        <div
                          className={clsx(
                            classesSkill.skill_title,
                            classesSkill.skill_title__meterRoot,
                          )}
                        >
                          {title}
                        </div>
                      </MeterRoot>
                    </Fragment>
                  );
                })}
              </MeterRoot>
              <div className={classesSkill.skill_title}>Search</div>
            </div>

            <div
              className={clsx(classesSkill.skill, classesSkills.skill)}
              ref={searchRef}
            >
              <div className={classesSkill.meter_edgeVertical} />
              <div
                className={clsx(
                  classesMeterRoot.meter,
                  classesMeterRoot.meter_smallRoot,
                )}
              >
                <div className={classesSkill.meter_nodeWrapper}>
                  <div className={classesSkill.meter_node} />
                </div>
                <div
                  className={clsx(
                    classesSkill.meter_edge,
                    classesSkills.meter_edge,
                  )}
                />
                <Autocomplete
                  classes={{ inputRoot: classesSkills.autoComplete_inputRoot }}
                  className={classesSkills.autoComplete}
                  options={skills}
                  getOptionLabel={({ title }) => title}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={handleAutoCompleteChange}
                />
              </div>
            </div>
            {skillsFiltered.map((skill) => (
              <Skill key={skill.id} skill={skill} />
            ))}

            {skillsFiltered.length === 0 && (
              <div className={clsx(classesSkill.skill, classesSkills.skill)}>
                <div
                  className={clsx(
                    classesSkill.meter_edgeVertical,
                    classesSkill.meter_edgeVertical__lastChild,
                  )}
                />
                <div
                  className={clsx(
                    classesMeterRoot.meter,
                    classesMeterRoot.meter_smallRoot,
                  )}
                >
                  <div className={classesSkill.meter_nodeWrapper}>
                    <div className={classesSkill.meter_node} />
                  </div>

                  <div
                    className={clsx(
                      classesSkill.meter_edge,
                      classesSkills.meter_edge,
                    )}
                  />
                  <div className={classesSkill.meter_text}>No results</div>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>

      <svg className={classesSkills.filters}>
        <Filter color={primaryColor} />
        <Filter color={secondaryColor} />
        <Filter color={trinaryColor} />
        <Filter color={languagesColor} />
      </svg>
    </>
  );
};

export default Skills;
