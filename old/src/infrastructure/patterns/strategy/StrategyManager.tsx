import IStrategy from './Strategy';

class StrategyManager<T, U> {
    private _strategies: IStrategy<T, U>[];
    constructor() {
        this._strategies = [];
    }
    addStrategy(strategy: IStrategy<T, U>) {
        this._strategies = [...this._strategies, strategy];
    }
    getStrategy(name: string): IStrategy<T, U> {
        var strategy = this._strategies.find(strategy => strategy.name === name);

        if (strategy === undefined) {
            throw 'Strategy not found.';
        }

        return strategy;
    }
}

export default StrategyManager;