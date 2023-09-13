import React from 'react';


function Options({ i, eachOpt, choosing, answer, dispatch }) {
    
  const hasChoosingYet = choosing !== null;

  function handleChoosingSelected() {
    dispatch({ type: 'newChoosing', payload: i });
  }

  function classOfButt() {
    return `btn btn-option 
                ${hasChoosingYet && 
                    (`${i === choosing && 
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
