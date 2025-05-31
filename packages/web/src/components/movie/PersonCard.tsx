import React from 'react';

const PersonCard = ({ person, role }: { person: any, role: string }) => (
  <div className="person-card">
    <img
      className="person-avatar"
      src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : "/default-profile.png"}
      alt={person.name}
    />
    <div>
      <div className="person-name">{person.name}</div>
      <div className="person-role">{role}</div>
    </div>
  </div>
);

export default PersonCard; 