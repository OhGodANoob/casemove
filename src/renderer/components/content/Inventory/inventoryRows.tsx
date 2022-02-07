import {
  CheckCircleIcon,
  ExternalLinkIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRenameModal } from 'renderer/store/actions/modalMove actions';
import RenameModal from '../shared/modals & notifcations/modalRename';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const now = new Date();
function content() {
  const inventory = useSelector((state: any) => state.inventoryReducer);
  const inventoryFilters = useSelector(
    (state: any) => state.inventoryFiltersReducer
  );
  const userDetails = useSelector((state: any) => state.authReducer);

  const dispatch = useDispatch();

  let inventoryToUse = [] as any;
  if (
    inventoryFilters.inventoryFiltered.length == 0 &&
    inventoryFilters.inventoryFilter.length == 0
  ) {
    inventoryToUse = inventory.combinedInventory;
  } else {
    inventoryToUse = inventoryFilters.inventoryFiltered;
  }
  console.log(inventory.combinedInventory);

  return (
    <>
      <RenameModal />

      {/* Projects list (only on smallest breakpoint) */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Product details
          </h2>
        </div>
        <ul
          role="list"
          className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
        >
          {inventoryToUse.map((project) => (
            <li key={project.item_id}>
              <a
                href="#"
                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
              >
                <span className="flex items-center truncate space-x-3">
                  <span
                    className={classNames(
                      project.bgColorClass,
                      'w-2.5 h-2.5 flex-shrink-0 rounded-full'
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-medium truncate text-sm leading-6">
                    {project.item_name}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className=" border-gray-200 sticky top-0">
            <th className="table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              QTY
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="lg:pl-2">Product</span>
            </th>
            <th className="hidden xl:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stickers/Patches
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tradehold
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Moveable
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link
            </th>
            <th className="table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="md:hidden">Link</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {inventoryToUse.map((project) => (
            <tr key={project.item_id}
            className={classNames(
              project.item_name
                ?.toLowerCase()
                .includes(inventoryFilters.searchInput.toLowerCase().trim())
                ||
                project.item_customname
                ?.toLowerCase()
                .includes(inventoryFilters.searchInput.toLowerCase().trim())

                ? ''
                : 'hidden',
              'hover:shadow-inner'
            )}
            >
              <td className="table-cell px-6 py-3 whitespace-nowrap font-medium text-sm text-gray-500 text-right">
                <div
                  className={classNames(
                    project.bgColorClass.replace('bg', 'border'),
                    'bg-white border-2 font-medium text-black border-solid rounded-full w-8 h-8 flex items-center justify-center font-mono'
                  )}
                >
                  {project.combined_QTY}
                </div>
              </td>
              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap overflow-hidden text-sm font-normal text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  {/* Projects list (only on smallest breakpoint)
                            <div
                              className={classNames(project.bgColorClass, 'flex-shrink-0 w-2.5 h-2.5 rounded-full')}
                              aria-hidden="true"
                            /> */}
                  <div className="flex flex-shrink-0 -space-x-1">
                    <img
                      className="max-w-none h-11 w-11 rounded-full ring-2 ring-transparent object-cover bg-gradient-to-t from-gray-100 to-gray-300"
                      src={
                        'https://raw.githubusercontent.com/SteamDatabase/GameTracking-CSGO/master/csgo/pak01_dir/resource/flash/' +
                        project.item_url +
                        '.png'
                      }
                    />
                  </div>
                  <span>
                    <span className="flex">
                      {project.item_customname !== null
                        ? project.item_customname
                        : project.item_name}
                      {project.item_url.includes('casket') ? (
                        <Link
                          to=""
                          className="text-gray-500"
                          onClick={() =>
                            dispatch(
                              setRenameModal(
                                project.item_id,
                                project.item_customname !== null
                                  ? project.item_customname
                                  : project.item_name
                              )
                            )
                          }
                        >
                          <PencilIcon className="h-4 w-5 pb-1" />
                        </Link>
                      ) : (
                        ''
                      )}
                    </span>
                    <span
                      className="text-gray-500 "
                      title={project.item_paint_wear}
                    >
                      {project.item_customname !== null
                        ? project.item_storage_total !== undefined
                          ? project.item_name +
                            ' (' +
                            project.item_storage_total +
                            ')'
                          : project.item_name
                        : ''}
                        

                      {project.item_customname !== null &&
                      project.item_paint_wear !== undefined
                        ? ' - '
                        : ''}

                      {project.item_paint_wear !== undefined
                        ? project.item_wear_name
                        : ''}
                      {/* 
                      {isShown == project.item_id  && project.item_paint_wear !== undefined?
                        <div>{project.item_paint_wear}</div>
                       : ''} */}

                    </span>
                  </span>
                </div>
              </td>
              <td className="hidden xl:table-cell px-6 py-3 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2 justify-center rounded-full drop-shadow-lg">
                  <div className="flex flex-shrink-0 -space-x-1">
                    {project.stickers.map((sticker, index) => (
                      <img
                        key={index}
                        className="max-w-none h-8 w-8 rounded-full ring-2 object-cover ring-transparent bg-gradient-to-t from-gray-100 to-gray-300"
                        src={
                          'https://raw.githubusercontent.com/SteamDatabase/GameTracking-CSGO/master/csgo/pak01_dir/resource/flash/' +
                          sticker.sticker_url +
                          '.png'
                        }
                        alt={sticker.sticker_name}
                        title={sticker.sticker_name}
                      />
                    ))}
                  </div>
                </div>
              </td>

              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                {project.trade_unlock !== undefined
                  ? Math.ceil(
                      (project.trade_unlock.getTime() - now.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) + ' days'
                  : ''}
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                <div className="flex justify-center rounded-full drop-shadow-lg">
                  {project.item_moveable == true ? (
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    ''
                  )}
                </div>
              </td>
              <td className="table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 hover:text-gray-200 text-right">
                <div className="flex justify-center rounded-full drop-shadow-lg">
                  <Link
                    to={{
                      pathname: `https://steamcommunity.com/profiles/${userDetails.steamID}/inventory/#730_2_${project.combined_ids[0]}`,
                    }}
                    target="_blank"
                  >
                    {project.combined_ids.length == 1 ? (
                      <ExternalLinkIcon
                        className="h-5 w-5 text-gray-500 group-hover:text-gray-100"
                        aria-hidden="true"
                      />
                    ) : (
                      ''
                    )}
                  </Link>
                </div>
              </td>

              <td className="hidden md:px-6 py-3 whitespace-nowrap text-right text-sm font-medium"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function InventoryRowsComponent() {
  return content();
}