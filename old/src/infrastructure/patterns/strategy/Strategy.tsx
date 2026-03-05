interface IStrategy<T, U> {
    name: string,
    doAction(parameters?: U): T;
}

export default IStrategy; 