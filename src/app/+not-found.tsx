import { Redirect } from 'expo-router';

// Unknown URLs (typos, old links) go to the start screen instead of an error page.
export default function NotFound() {
  return <Redirect href="/" />;
}
