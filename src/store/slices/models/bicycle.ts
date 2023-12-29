
export interface IBicycle {
    name: string,
    type: string,
    color: string,
    id: number,
    price: number,
    status?: string,
}

export interface IBicyclesState {
    bicycles: IBicycle[];
    createNewBicycleLoading: boolean;
    createNewBicycleError: boolean;
    createNewBicycleErrorMsg: string;
    getAllBicyclesLoading: boolean;
    getAllBicyclesError: boolean;
    removeBicycleLoading: boolean;
    removeBicycleError: boolean;
    updateBicycleStatusLoading: boolean;
    updateBicycleStatusError: boolean;
}