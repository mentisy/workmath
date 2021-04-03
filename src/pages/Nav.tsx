import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLambda } from "@fortawesome/pro-duotone-svg-icons/faLambda";
import { faCircle } from "@fortawesome/pro-light-svg-icons/faCircle";

function Nav(): JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <nav>
                <Link to="/clips">
                    <button className="button button-outline">{t("Clips")}</button>
                </Link>
                <Link to="/fixtures">
                    <button className="button button-outline">{t("Fixtures")}</button>
                </Link>
            </nav>
            <div className="logo">
                <span className="fa-stack fa-7x">
                    <FontAwesomeIcon icon={faLambda} className="fa-stack-1x" />
                    <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
                </span>
            </div>
        </>
    );
}

export default Nav;
