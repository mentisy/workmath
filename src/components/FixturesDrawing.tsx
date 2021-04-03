import { useState, useEffect } from "react";
import FixturesCalculation from "../classes/FixturesCalculation";
import { FixturesFormDataInterface } from "../interfaces";

interface PropsInterface {
    formData: FixturesFormDataInterface;
    fixturesGrid: FixturesCalculation;
}

export default function FixturesDrawing({ formData, fixturesGrid }: PropsInterface) {
    const [divWidth, setDivWidth] = useState<number>(500);

    const resultDiv = document.getElementById("fixtures-result");
    useEffect(() => {
        const resultDiv = document.getElementById("fixtures-result");
        if (!resultDiv) {
            return;
        }
        setDivWidth(resultDiv.clientWidth + 2);
    }, [resultDiv]);

    const scale = divWidth / formData.roomLength;

    /**
     * Get the position to start "drawing" the fixture, on the left most or top most part of the fixture
     * The received `centeredCoord` is at the center of the fixture, so this function will offset the center
     * by half the width/height of the lamp and return centered coord - offset
     *
     * @param {number} centeredCoord
     * @param {number} lampSize
     * @returns {number}
     */
    const fixturePositionCenteredAndScaled = (centeredCoord: number, lampSize: number) => {
        const fixtureStartPosition = centeredCoord - lampSize / 2;

        return fixtureStartPosition * scale;
    };

    const fixtures = fixturesGrid.getGrid().map((fixture, index: number) => (
        <div
            key={index}
            className="fixture"
            style={{
                left: fixturePositionCenteredAndScaled(fixture.x, formData.lampLength),
                top: fixturePositionCenteredAndScaled(fixture.y, formData.lampWidth),
                width: formData.lampLength * scale,
                height: formData.lampWidth * scale,
            }}
        />
    ));

    return (
        <div
            aria-label="Fixtures drawing"
            className="box fixture-container"
            style={{
                width: formData.roomLength * scale,
                height: formData.roomWidth * scale,
            }}
        >
            {fixtures}
        </div>
    );
}
