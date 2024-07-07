import React from 'react';
function Footer() {
  return (
    <div className="bg-black text-sky-300 flex justify-center align-center gap-1 fixed bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow md:flex md:items-center md:justify-center dark:bg-gray-800 dark:border-gray-600 text-sm">
      <p>
        This application was created using React and Tailwind Css as part of a
        beginner project.
      </p>
      <p>There is still a lot to learn and practice.</p>
    </div>
  );
}
export default Footer;

// import React from 'react';
// function Footer() {
//   return (
//     <div className="bg-black text-cyan-700 flex justify-center align-center gap-1 fixed bottom-0 left-0 z-20 w-full p-6 border-t border-gray-200 shadow md:flex md:items-center md:justify-center dark:bg-gray-800 dark:border-gray-600">
//       <p>
//         This application was created using React and Tailwind Css as
//         part of a beginner project.
//       </p>
//       <p>There is still a lot to learn and practice.</p>
//     </div>
//   );
// }
// export default Footer;
