import React from 'react';
import './SpellBook.css'

function SpellBook({ castSpell }) {
  const spells = ["Fireball", "Ice Spike", "Wind Gust", "Earthquake"];

  return (
      <div className='spellbook-content'>
          <h2>Livro de Feitiços</h2>
          <ul>
              {spells.map(spell => (
                  <li key={spell}>
                      <button onClick={() => castSpell(spell)}>{spell}</button>
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default SpellBook;