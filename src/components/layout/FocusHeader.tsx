import { getCurrentFocus } from '@/lib/mdx';
import FocusHeaderClient from './FocusHeaderClient';

/**
 * Server Component que busca os dados
 */
export default function FocusHeader() {
  const focus = getCurrentFocus();
  
  return <FocusHeaderClient focus={focus} />;
}
