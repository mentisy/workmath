/**
 * Coordinate interface
 *
 * Coordinates for a fixture in the grid
 */
export interface CoordInterface {
    x: number;
    y: number;
}

/**
 * FixtureCalculation class constructor Interface
 */
interface FixturesCalculationConstructorInterface {
    spaceX: number;
    spaceY: number;
    gridXCount: number;
    gridYCount: number;
}

/**
 * Calculate the fixture grid, based on user input
 *
 * @author Alexander Volle
 */
export default class FixturesCalculation {
    /**
     * Input total space in X axis
     *
     * @type {number}
     */
    spaceX: number = 0;

    /**
     * Input total space in Y axis
     *
     * @type {number}
     */
    spaceY: number = 0;

    /**
     * Input total fixtures in X axis
     *
     * @type {number}
     */
    gridXCount: number = 0;

    /**
     * Input total fixtures in Y axis
     *
     * @type {number}
     */
    gridYCount: number = 0;

    /**
     * Space between fixtures in X axis
     *
     * @type {number}
     */
    spacingX: number;

    /**
     * Space between fixtures in Y axis
     *
     * @type {number}
     */
    spacingY: number;

    /**
     * Grid with fixture coordinates in X and Y axis
     *
     * @type {CoordInterface[]}
     */
    grid: CoordInterface[] = [];

    /**
     * Constructor that performs calculation
     *
     * @param {number} spaceX
     * @param {number} spaceY
     * @param {number} gridXCount
     * @param {number} gridYCount
     */
    constructor({ spaceX, spaceY, gridXCount, gridYCount }: FixturesCalculationConstructorInterface) {
        this.spaceX = spaceX;
        this.spaceY = spaceY;
        this.gridXCount = gridXCount;
        this.gridYCount = gridYCount;

        this.spacingX = this.calculateSpacing(spaceX, gridXCount);
        this.spacingY = this.calculateSpacing(spaceY, gridYCount);

        this.grid = this.buildGrid();
    }

    /**
     * Build the fixture grid with coordinates for the X and Y axis
     *
     * @returns {CoordInterface[]}
     */
    buildGrid(): CoordInterface[] {
        const gridX = this.buildPart(this.spaceX, this.gridXCount);
        const gridY = this.buildPart(this.spaceY, this.gridYCount);

        const coords = [];
        for (let x = 0; x < gridX.length; x++) {
            const xCoord = gridX[x];
            for (let y = 0; y < gridY.length; y++) {
                const yCoord = gridY[y];
                coords.push({
                    x: xCoord,
                    y: yCoord,
                });
            }
        }

        return coords;
    }

    /**
     * Build the coordinates for a given axis, based on axis space and how many fixtures in the axis
     *
     * @param {number} space
     * @param {number} count
     * @returns {[number]}
     */
    buildPart(space: number, count: number): number[] {
        const between = this.calculateSpacing(space, count);
        const half = between / 2;
        const coords = [half];

        for (let i = 1, c = half; i < count; i++) {
            c += between;
            coords.push(c);
        }

        return coords;
    }

    /**
     * Calculate the space between each fixtures center to center
     *
     * @param {number} space
     * @param {number} count
     * @returns {number}
     */
    calculateSpacing(space: number, count: number): number {
        return space / count;
    }

    /**
     * Getter method for the grid coordinates
     *
     * @returns {CoordInterface[]}
     */
    getGrid(): CoordInterface[] {
        return this.grid;
    }

    /**
     * Getter method for spacing between fixtures center to center in the X axis
     *
     * @returns {number}
     */
    getXSpacing(): number {
        return this.spacingX;
    }

    /**
     * Getter method for spacing between fixtures center to center in the Y axis
     *
     * @returns {number}
     */
    getYSpacing(): number {
        return this.spacingY;
    }
}
