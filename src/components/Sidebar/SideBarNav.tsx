import { Stack, Box } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <Box>
        <NavSection title="GERAL">
          <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>

          <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink>
        </NavSection>
      </Box>
      <Box>
        <NavSection title="AUTOMAÇÃO">
          <NavLink  href="/forms" icon={RiInputMethodLine}>Formulários</NavLink>
          <NavLink  href="/automation" icon={RiGitMergeLine}>Automação</NavLink>
        </NavSection>
      </Box>
    </Stack>
  );
}
