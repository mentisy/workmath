import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ClipsCalculation from "../classes/ClipsCalculation";

interface ShortcutInterface {
    maxDistanceBetween: number;
    distanceEnd: number;
}

interface FormDataInterface {
    maxDistanceBetween: number;
    distanceEnd: number;
    length: number;
}

interface ShortcutsInterface {
    pipe: ShortcutInterface;
    cable: ShortcutInterface;
}

function Clips() {
    const { t } = useTranslation();

    const shortcuts: ShortcutsInterface = {
        pipe: {
            maxDistanceBetween: 90,
            distanceEnd: 10,
        },
        cable: {
            maxDistanceBetween: 27,
            distanceEnd: 5,
        },
    };

    const [formData, setFormData] = useState<FormDataInterface>({
        length: -1,
        ...shortcuts.pipe,
    });

    const handleClickShortcut = (shortcut: keyof ShortcutsInterface): void => {
        setFormData((prevState) => ({
            ...prevState,
            ...shortcuts[shortcut],
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const clipsCalculation = new ClipsCalculation({
        length: formData.length,
        maxDistance: formData.maxDistanceBetween,
        distanceEnd: formData.distanceEnd,
    });

    return (
        <div aria-label="Clips">
            <div aria-label="Shortcuts">
                <button className="button button-outline" onClick={() => handleClickShortcut("pipe")}>
                    {t("Pipe")}
                </button>{" "}
                <button className="button button-outline" onClick={() => handleClickShortcut("cable")}>
                    {t("Cable")}
                </button>
            </div>
            <div>
                <label>{t("Length")}</label>
                <input
                    type="number"
                    placeholder={t("Length")}
                    id="length"
                    name="length"
                    min={1}
                    value={formData.length < 0 ? "" : formData.length}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>{t("Max distance between clips")}</label>
                <input
                    type="number"
                    placeholder={t("Distance between")}
                    id="maxDistanceBetween"
                    name="maxDistanceBetween"
                    min={1}
                    value={formData.maxDistanceBetween}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>{t("Distance to end clips")}</label>
                <input
                    type="number"
                    placeholder={t("Distance end")}
                    id="distanceEnd"
                    name="distanceEnd"
                    min={1}
                    value={formData.distanceEnd}
                    onChange={handleChange}
                />
            </div>
            <div aria-label="Clips result" className="box">
                <table>
                    <tbody>
                        <tr>
                            <td>{t("Number of clips")}</td>
                            <td>
                                {clipsCalculation.getClipsCount()} {t("pcs")}
                            </td>
                        </tr>
                        <tr>
                            <td>{t("Distance between clips")}</td>
                            <td>{clipsCalculation.getDistanceBetween()} cm</td>
                        </tr>
                        <tr>
                            <td>{t("Distance between first/last clips from ends")}</td>
                            <td>{clipsCalculation.getDistanceEnd()} cm</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Clips;
