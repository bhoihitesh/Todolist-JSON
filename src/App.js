import { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Todo } from "./Todo";

function App() {
  useEffect(() => {
    import('../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
