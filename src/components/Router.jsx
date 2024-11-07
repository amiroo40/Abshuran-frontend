import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Cultural, Economic, Gallery, Home, IrAndWorld, Political, SearchResults, Social, Sports, UrbanManagement } from '../pages'
import ShowNews from './ShowNews'
import NewsContext from '../context/newsContext'
import { AdminForm, AdminPage, EditNews, Login, NewMonthlyJournal } from '../admin'
import AdminContext from '../context/adminContext'
import { useAuth } from '../context/AuthContext'

const Router = () => {

    const { news } = useContext(NewsContext)

    const { handleSubmit, filesName, setFilesName, newNews, handleImageUpload, setNewNews } = useContext(AdminContext)

    const { isAuthenticated } = useAuth();

    return (
        <>
            <Routes>
                <Route path='/home' element={<Navigate replace to='/' />} />
                <Route path='/ir-world' element={<IrAndWorld />} />
                <Route path='/sports' element={<Sports />} />
                <Route path='/cultural' element={<Cultural />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/social' element={<Social />} />
                <Route path='/political' element={<Political />} />
                <Route path='/economic' element={<Economic />} />
                <Route path='/urban-management' element={<UrbanManagement />} />
                <Route path='/search-results' element={<SearchResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route
                    path="/admin"
                    element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
                >
                    <Route
                        path='new-news'
                        element={
                            <AdminForm
                                handleSubmit={handleSubmit}
                                newNews={newNews}
                                handleImageUpload={handleImageUpload}
                                setNewNews={setNewNews}
                                filesName={filesName}
                                setFilesName={setFilesName}
                            />
                        } />
                    <Route path='new-monthly-journal' element={<NewMonthlyJournal />} />
                </Route>
                <Route path='/admin/new-news/:id' element={<EditNews filesName={filesName} setFilesName={setFilesName} />} />
                {news.map((item) => (
                    <Route key={item._id} path={`/${item.cat}/:id`} element={<ShowNews />} />
                ))}
                <Route path='/' element={<Home />} />
            </Routes>
        </>
    )
}

export default Router
