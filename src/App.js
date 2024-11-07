import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer, NavigationPanel, Router } from './components'
import NewsProvider from './context/NewsProvider'
import AdminProvider from './context/AdminProvider'
import { AuthProvider } from './context/AuthContext'


const App = () => {

    return (
        <>
            <div className="background"></div>
            <div className='content'>
                <BrowserRouter>
                    <NewsProvider >
                        <AdminProvider>
                            <AuthProvider>
                                <NavigationPanel />
                                <main className="flex-grow">
                                    <Routes>
                                        <Route path='/*' element={<Router />} />
                                    </Routes>
                                </main>
                            </AuthProvider>
                            <Footer />
                        </AdminProvider>
                    </NewsProvider>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App;
