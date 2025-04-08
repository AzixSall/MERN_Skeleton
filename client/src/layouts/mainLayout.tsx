// src/layouts/MainLayout.tsx
import Nav from './nav';
import Footer from './footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};


export default MainLayout;