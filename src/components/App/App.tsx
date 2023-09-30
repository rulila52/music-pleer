import { FC } from "react";
import { PlayerBase } from "../PlayerBase/PlayerBase";
import { Provider } from "react-redux";
import { store } from "../../store/store";

export const App: FC = () => {
    return (
        <Provider store={store}>
            <PlayerBase />
        </Provider>
    );
};
