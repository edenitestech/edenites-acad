// src/pages/Dashboard/AccountSettings.jsx
import { EditProfileForm } from '../../components/Dashboard/EditProfileForm';
import { ChangePasswordForm } from '../../components/Dashboard/ChangePasswordForm';
import {
  Section,
  SectionHeader
} from '../../styles/DashboardStyles';

const AccountSettings = () => {
  return (
    <div>
      <Section>
        <SectionHeader>
          <h2>Edit Profile</h2>
        </SectionHeader>
        <EditProfileForm />
      </Section>
      
      <Section>
        <SectionHeader>
          <h2>Change Password</h2>
        </SectionHeader>
        <ChangePasswordForm />
      </Section>
    </div>
  );
};

export default AccountSettings;