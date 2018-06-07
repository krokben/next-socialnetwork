import Header from './Header';

const Layout = (props) => (
  <div className="layout">
    <Header />
    {props.children}
    <style jsx global>{`
      html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto, Helvetica, Arial, sans-serif;
        margin: 0;
        overflow-y: scroll;
      }
      a {
        color: #333;
        text-decoration: none;
      }
      a:hover {
        color: #999;
      }

      a:visited {
        color: #333;
      }
    `}</style>
    <style jsx>{`
      .layout {
        margin: 20px;
        padding: 20px;
        border: 1px solid #DDD;
      }
    `}</style>
  </div>
);

export default Layout;
