import Navbar from "../Navbar/Navbar";

type PropsType = {
  children: React.ReactElement;
};

function Application({ children }: PropsType) {
  return (
    <main style={{ padding: "10px" }}>
      <Navbar />
      <div className="content">{children}</div>
    </main>
  );
}

export default Application;
