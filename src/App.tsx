import './App.css'
import { Button } from './components/Button'
import { PolicyCard, PolicyRow } from './features/PolicyCard'
import { usePolicies } from './hooks/usePolicies'

function App() {
  const { policies, isLoading, error } = usePolicies()
  return (
    <>
      <h1>Mina försäkringar</h1>

      {isLoading && (
        <p>Hämtar dina försäkringar</p>
      )}

      {error && (
        <p role="alert">{error}</p>
      )}

      {policies.length === 0 && (
        <>
          <p>Du har inga försäkringar hos oss just nu</p>
          <button>Se våra produkter</button>
        </>
      )}

      {policies.length > 0 && (
        <ul>
          {policies.map(policy => {
            console.log(policies)
            return (
            <li key={policy.policyNumber}>
              <PolicyCard status={policy.policyStatus} title={policy.productName} subtitle={policy.policyDescription}>
                <PolicyRow label="Startdatum" value={policy.policyStartDate} />
                <PolicyRow label="Försäkringsnummer" value={policy.policyNumber} />
                <PolicyRow label="Pris per månad" value={policy.yearlyPrice} />
              </PolicyCard>
            </li>
            )
          })}
        </ul> 
      )}

      <Button>knapp</Button>
      <Button variant='secondary'>knapp 2 </Button>
      <Button variant="ghost" loading loadingText='Hämtar'>loading</Button>
    </>
  )
}

export default App
