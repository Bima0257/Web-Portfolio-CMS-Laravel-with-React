import AppRouter from './routes/router'
import { AppLoaderProvider, useAppLoader } from './context/AppLoaderContext'
import { useAppBootstrap } from './hook/useAppBootstrap'
import Loader from './components/Loader'

const AppContent = () => {
  const { isLoading } = useAppLoader()

  useAppBootstrap()

  if (isLoading) return <Loader fullscreen />

  return <AppRouter />
}

function App() {
  return (
    <>
      <AppLoaderProvider>
        <AppContent />
      </AppLoaderProvider>
    </>
  )
}

export default App
