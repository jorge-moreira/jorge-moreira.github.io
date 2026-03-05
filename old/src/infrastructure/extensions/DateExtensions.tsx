export { }

declare global {
    interface Date {
        isValid(): boolean;
    }
}

Date.prototype.isValid = function (): boolean {
    if (this === undefined) {
        return false;
    }

    return !isNaN(Number(this));
};