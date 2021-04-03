import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
import { FixturesFormDataInterface } from "../interfaces";
import FixturesCalculation from "../classes/FixturesCalculation";
import FixturesDrawing from "../components/FixturesDrawing";

interface FixtureInputsInterface {
    id: keyof FixturesFormDataInterface;
    name: string;
}

function Fixtures() {
    const { t } = useTranslation();
    const inputs: FixtureInputsInterface[] = [
        { id: "roomLength", name: t("Room length") },
        { id: "roomWidth", name: t("Room width") },
        { id: "lampLength", name: t("Lamp length") },
        { id: "lampWidth", name: t("Lamp width") },
        { id: "lampLengthCount", name: t("Lamp length count") },
        { id: "lampWidthCount", name: t("Lamp width count") },
    ];

    const [formData, setFormData] = useState<FixturesFormDataInterface>({
        roomLength: 800,
        roomWidth: 400,
        lampLength: 120,
        lampWidth: 25,
        lampLengthCount: 3,
        lampWidthCount: 2,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: parseInt(value),
        }));
    };

    // noinspection JSSuspiciousNameCombination
    const fixturesGrid = new FixturesCalculation({
        spaceX: formData.roomLength,
        spaceY: formData.roomWidth,
        gridXCount: formData.lampLengthCount,
        gridYCount: formData.lampWidthCount,
    });

    const inputsRendered = inputs.map((input) => (
        <div key={input.id}>
            <div>
                <label>{input.name}</label>
            </div>
            <input
                type="number"
                placeholder={input.name}
                id={input.id}
                name={input.id}
                min={1}
                value={formData[input.id]}
                onChange={handleChange}
            />
        </div>
    ));

    return (
        <div aria-label="Fixtures">
            {inputsRendered}
            {result()}
        </div>
    );

    function result() {
        const requiredSpaceLength = fixturesGrid.getXSpacing() + formData.lampLength * formData.lampLengthCount;
        const requiredSpaceWidth = fixturesGrid.getYSpacing() + formData.lampWidth * formData.lampWidthCount;
        if (formData.lampLengthCount !== 1 && requiredSpaceLength > formData.roomLength) {
            return (
                <div className="box mt-2 error">
                    {t("RoomLengthError", { cm: formData.roomLength, requiredSpace: Math.round(requiredSpaceLength) })}
                </div>
            );
        }
        if (formData.lampWidthCount !== 1 && requiredSpaceWidth > formData.roomWidth) {
            return (
                <div className="box mt-2 error">
                    {t("RoomWidthError", { cm: formData.roomWidth, requiredSpace: Math.round(requiredSpaceWidth) })}
                </div>
            );
        }

        return (
            <>
                <div aria-label="Fixtures result" className="box" id="fixtures-result">
                    <h3>{t("Length direction")}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>{t("Distance from wall to first lamp (wall-center)")}</td>
                                <td>{Math.round(fixturesGrid.getXSpacing() / 2)} cm</td>
                            </tr>
                            {formData.lampLengthCount !== 1 && (
                                <tr>
                                    <td>{t("Distance between lamps (center-center)")}</td>
                                    <td>{Math.round(fixturesGrid.getXSpacing())} cm</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h3>{t("Width direction")}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>{t("Distance from wall to first lamp (wall-center)")}</td>
                                <td>{Math.round(fixturesGrid.getYSpacing() / 2)} cm</td>
                            </tr>
                            {formData.lampWidthCount !== 1 && (
                                <tr>
                                    <td>{t("Distance between lamps (center-center)")}</td>
                                    <td>{Math.round(fixturesGrid.getYSpacing())} cm</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <FixturesDrawing fixturesGrid={fixturesGrid} formData={formData} />
            </>
        );
    }
}

export default Fixtures;
