import React from 'react';

function HowItWorks() {
  const snacks = [
    {
      type: 'Japanese noodles',
      description: 'Tasty ramen, udon and more!',
      icon: '/icons/noodles.png'
    },
    {
      type: 'Seasonal Japanese drinks',
      description: 'Fanta, Ramune and more!',
      icon: '/icons/drinks.png'
    },
    {
      type: 'Cake & cookies',
      description: 'Dorayaki and pastries!',
      icon: '/icons/cakes.png'
    },
    {
      type: 'Japanese candies & Chocolates',
      description: 'Flavored candies and sweets!',
      icon: '/icons/candies.png'
    },
    {
      type: 'Mochi & Jellies',
      description: 'Pudding and chewy goods!',
      icon: '/icons/mochi.png'
    },
    {
      type: 'Chips & salty treats',
      description: 'Crunchy snacks!',
      icon: '/icons/chips.png'
    }
  ];

  return (
    <section className="py-16 bg-light-sakura text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-4xl font-bold">What’s inside the box?</h2>
          <hr className="my-4 border-t-2 border-deeper-pink w-1/2 mx-auto"/>
          <h3 className="text-2xl mb-8">Japan-exclusive snacks!</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {snacks.map((snack, index) => (
              <div key={index} className="flex items-center mb-4">
                <img src={snack.icon} alt={snack.type} className="w-12 h-12 mr-4"/>
                <div>
                  <h4 className="text-xl font-semibold">{snack.type}</h4>
                  <p>{snack.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <img src="box5.jpg" alt="Box" className="rounded-lg shadow-lg"/>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;


