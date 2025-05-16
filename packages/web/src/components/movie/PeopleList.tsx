import React from 'react';
import PersonCard from './PersonCard';

const PeopleList = ({ directors, cast }: { directors: any[], cast: any[] }) => (
  <div className="movie-people-section">
    <h2>감독/출연</h2>
    <div className="people-list two-column">
      <div className="people-col">
        {directors.map((person: any) => (
          <PersonCard key={person.id} person={person} role="감독" />
        ))}
        {cast.slice(0, 3).map((person: any) => (
          <PersonCard key={person.id} person={person} role={person.character} />
        ))}
      </div>
      <div className="people-col">
        {cast.slice(3, 6).map((person: any) => (
          <PersonCard key={person.id} person={person} role={person.character} />
        ))}
      </div>
    </div>
  </div>
);

export default PeopleList; 