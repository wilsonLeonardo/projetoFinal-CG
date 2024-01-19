/**
 * Base class for vectors
 */
export abstract class VecBase {
    protected e: number[];

    /**
     * Constructor for VecBase
     * @param size The number of elements in the vector.
     */
    constructor(size: number) {
        this.e = new Array(size);
    }

    /**
     * Get the value at a specific index in the vector.
     * @param index The index of the element.
     * @returns The value at the specified position.
     */
    get(index: number): number {
        return this.e[index];
    }

    /**
     * Set the value at a specific index in the vector.
     * @param index The index of the element.
     * @param value The value to be set at the specified position.
     */
    set(index: number, value: number): void {
        this.e[index] = value;
    }

    /**
     * Abstract method for adding another vector to this vector.
     * @param v The vector to be added.
     * @returns The result of the addition as a new vector.
     */
    abstract add(v: VecBase): VecBase;

    /**
     * Abstract method for scaling the vector by a scalar value.
     * @param t The scalar value to scale the vector by.
     * @returns The result of the scaling as a new vector.
     */
    abstract scale(t: number): VecBase;

    /**
     * Abstract method for dividing the vector by a scalar value.
     * @param t The scalar value to divide the vector by.
     * @returns The result of the division as a new vector.
     */
    abstract divide(t: number): VecBase;

    /**
     * Abstract method for calculating the length (magnitude) of the vector.
     * @returns The length of the vector.
     */
    abstract length(): number;

    /**
     * Abstract method for calculating the squared length of the vector.
     * @returns The squared length of the vector.
     */
    abstract lengthSquared(): number;
}