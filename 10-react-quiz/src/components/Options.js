import React from 'react';


function Options({ index, eachOpt, choosing, answer, dispatch }) {
    
  const hasChoosingYet = choosing !== null;

  function handleChoosingSelected() {
    dispatch({ type: 'newChoosing', payload: index });
  }

  function classOfButt() {
    return `btn btn-option 
                ${hasChoosingYet && 
                    (`${index === choosing && 
                            (`choosing 
                                ${answer ? 
                                    'correct' : 'wrong'
                                }`
                            )
                        }`
                    )
                }
            `;
  };

  return (
    <>
        <button
            className={classOfButt()}
            style={{ margin: '8px' }}
            disabled={hasChoosingYet}
            onClick={handleChoosingSelected}
        >
        {eachOpt}
        </button>
    </>
  );
}

export default Options;
