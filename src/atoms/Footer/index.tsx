import React from "react";

import "./styles.scss";

import InstagramIcon from "../../assets/icons/instagramIcon.png";
import LinkedInIcon from "../../assets/icons/linkedinIcon.png";
import GithubIcon from "../../assets/icons/githubIcon.png";
import openRemoteUrl from "../../utils/openRemoteUrl";
import TimeUtils from "../../utils/TimeUtils";

const Footer: React.FC = () => {
  const goToInstagram = (): void =>
    openRemoteUrl("https://www.instagram.com/romantin1/");

  const goToLinkedIn = (): void =>
    openRemoteUrl("http://linkedin.com/in/roman-lytvyn-10ab02152");

  const goToGithub = (): void =>
    openRemoteUrl("https://github.com/romanlitvin");

  return (
    <footer className={"footerContainer"}>
      <div className={"footerContact"}>
        <p className={"contactTitle"}>Contact me:</p>
        <p className={"contactTitle"}>romanlitvin98@gmail.com</p>
      </div>
      <div className={"dummyMiddleContainer"}>
        <p className={"footerEmodji"}>🙃</p>
      </div>
      <div className={"footerSocial"}>
        <div onClick={goToInstagram} className={"footerSocialContainer"}>
          <img
            className={"instagramIcon"}
            src={InstagramIcon}
            alt={"instagram"}
          />
        </div>
        <div onClick={goToLinkedIn} className={"footerSocialContainer"}>
          <img className={"linkedInIcon"} src={LinkedInIcon} alt={"linkedin"} />
        </div>
        <div onClick={goToGithub} className={"footerSocialContainer"}>
          <img className={"githubIcon"} src={GithubIcon} alt={"github"} />
        </div>
      </div>
      <div className={"copyrightContainer"}>
        <p className={"copyrightTitle"}>&copy; Roman Lytvyn</p>
        <p className={"copyrightTitle"}>
          {`Kharkiv, Ukraine ${TimeUtils.now().get("year")}`}
        </p>
        <p className={"copyrightTitle"}>All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
