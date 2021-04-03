/**
 * ClipsCalculation class constructor interface
 */
interface ClipsCalculationConstructorInterface {
    length: number;
    maxDistance: number;
    distanceEnd: number;
}

/**
 * Calculate the required distances for each clip placings, based on user input
 *
 * @author Alexander Volle
 */
export default class ClipsCalculation {
    /**
     * Length of pipe/cable
     *
     * @type {number}
     */
    length: number = 0;

    /**
     * How many clips required
     *
     * @type {number}
     */
    clipsCount: number = 0;

    /**
     * How many spaces between clips
     *
     * @type {number}
     */
    spacings: number = 0;

    /**
     * Distance between each clip
     *
     * @type {number}
     */
    distanceBetween: number = 0;

    /**
     * Maximum distance between each clip
     *
     * @type {number}
     */
    maxDistance: number = 90;

    /**
     * Distance from the end of pipe/cable to first/last clip
     *
     * @type {number}
     */
    distanceEnd: number = 10;

    /**
     * Constructor that performs calculation
     *
     * @param {number} length Total length of cable/pipe
     * @param {number} maxDistance Max distance between each clip
     * @param {number} distanceEnd Distance to first/last clip from end of pipe
     */
    constructor({ length, maxDistance, distanceEnd }: ClipsCalculationConstructorInterface) {
        this.length = length;
        this.maxDistance = maxDistance;
        this.distanceEnd = distanceEnd;

        const compensatedLength = this.compensateDistanceEnd(this.length);
        if (this.length <= 0 || compensatedLength <= 0) {
            return;
        }

        this.calculateClipSpacing(compensatedLength);
        this.calculateDistance(compensatedLength);
    }

    /**
     * Calculate how much is left after taking away the length to the first clip and from the last clip
     *
     * @param {number} length
     * @returns {number}
     */
    compensateDistanceEnd(length: number): number {
        return length - this.distanceEnd * 2;
    }

    /**
     * Calculate how many spaces are between clips and how many clips are required for the length
     *
     * @param {number} length Length of pipe/cable
     */
    calculateClipSpacing(length: number): void {
        this.spacings = Math.ceil(length / this.maxDistance);
        this.clipsCount = this.spacings + 1;
    }

    /**
     * Calculate the actual distance between each clip
     *
     * @param length
     */
    calculateDistance(length: number): void {
        this.distanceBetween = Math.round((length / this.spacings) * 10) / 10;
    }

    /**
     * Getter method for the distance between property
     *
     * @returns {number}
     */
    getDistanceBetween(): number {
        return this.distanceBetween;
    }

    /**
     * Getter method for the distance from end to first/last clip
     *
     * @returns {number}
     */
    getDistanceEnd(): number {
        return this.distanceEnd;
    }

    /**
     * Getter method for how many clips required
     *
     * @returns {number}
     */
    getClipsCount(): number {
        return this.clipsCount;
    }
}
