import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    //! Redux (<Provider store={store})
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}
