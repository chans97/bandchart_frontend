import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
    return (<>
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    </>)
}