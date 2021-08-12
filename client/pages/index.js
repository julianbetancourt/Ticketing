import Link from "next/link"

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Signed in!</h1> : <h1>NOT signed in</h1>
}

export default LandingPage
