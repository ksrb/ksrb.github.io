import { ButtonBase, Link as MaterialUILink } from "@material-ui/core";
import { Email, GitHub, LinkedIn, Phone } from "@material-ui/icons";
import React, { FC, ReactNode } from "react";
import useStyles from "./styles";

type ContactsType = {
  icon: ReactNode;
  title: string;
  href: string;
};

const contacts: ContactsType[] = [
  { icon: <Email />, title: "", href: "mailto:ksrbkevinsuen@gmail.com" },
  { icon: <Phone />, title: "", href: "tel:+908-240-5093" },
  { icon: <GitHub />, title: "", href: "//github.com/ksrb" },
  { icon: <LinkedIn />, title: "", href: "//linkedin.com/in/ksrbkevinsuen" },
];

const Contacts: FC = () => {
  const classes = useStyles();

  return (
    <>
      {contacts.map(({ icon, href, title }, index) => (
        <ButtonBase key={index} className={classes.contact}>
          <MaterialUILink
            href={href}
            key={index}
            target="_blank"
            rel="noreferrer"
            className={classes.contact_link}
          >
            {icon}
          </MaterialUILink>
        </ButtonBase>
      ))}
    </>
  );
};

export default Contacts;
