import React from 'react'

const CardSection = () => {
  return (
    <>
        <div className="grid grid-cols-5 gap-2 pt-8 mb-10">
            {/* for status */}
            {/* {
                cardData.map((card) => {
                    return (
                        <div key={card.id}>
                            <Card id={card.id} name={card.name} image={card.image} status={card.status}/>
                        </div>
                    )
                })
            } */}
        </div>
    </>
  )
}

export default CardSection