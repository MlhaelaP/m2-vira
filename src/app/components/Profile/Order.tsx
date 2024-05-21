export const Order = ({ order }: any) => {
  return (
    <tbody>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <p className="whitespace-no-wrap text-violet-600">{order.title}</p>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="whitespace-no-wrap text-emerald-600">{order.price}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="whitespace-no-wrap text-sky-600">{order.size}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="whitespace-no-wrap text-fuchsia-600">{order.color}</p>
        </td>
      </tr>
    </tbody>
  );
};
