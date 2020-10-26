import React, { useEffect, useState } from "react";
import styles from './app.module.css';
import { BackendService, Ticket } from "./backend";

interface AppProps {
  backend: BackendService;
}

const App = ({ backend }: AppProps) => {
  const [tickets, setTickets] = useState([] as Ticket[]);

  // The backend returns observables, but you can convert to promises if 
  // that is easier to work with.
  useEffect(() => {
    const fetchData = async () => {
      const result = await backend.tickets().toPromise();
      setTickets(result)
    }
    fetchData();
  }, [backend]);

  return (
    <div className={styles.app}>
      <h2>Tickets</h2>
      {tickets ? (
        <ul>
          {tickets.map(t => (
            <li>
              Ticket: {t.id}, {t.description}
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
};

export default App;
