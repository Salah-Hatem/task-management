import LogoComponent from "../components/logo"

export default function Home() {
  return (
    <>
      <header className="home-header">
        <LogoComponent />
        <p>Manage your tasks with ease</p>
      </header>
      <main className="home-main">
        <div className="btn-group">
          <button className="btn-primary">
            <a href="/signup">Get Started</a>
          </button>
          <button className="btn-primary">
            <a href="/signin">Sign in</a>
          </button>
        </div>
      </main>
    </>
  )
}
