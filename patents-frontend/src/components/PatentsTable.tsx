import { FC, useState } from 'react';
import { usePatentsCountQuery, usePatentsQuery } from '../api/generated.ts';
import { toast } from 'sonner';
import {
  Button,
  ButtonGroup,
  Input,
  Link,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import { FaGoogle, FaYandexInternational } from 'react-icons/fa';
import { useDebounce } from 'ahooks';

export const PatentsTable: FC = () => {
  const [pagination, setPagination] = useState({ take: 25, skip: 0 });
  const { data: { patentsCount = 0 } = {} } = usePatentsCountQuery();
  const [search, setSearch] = useState('');
  const searchDebounced = useDebounce(search, { wait: 1000 })
  const {
    data: { patents } = {},
    loading: isLoadingPatents,
  } = usePatentsQuery({
    onError: (error) => toast.error(`Ошибка загрузки патентов: ${error.message}`),
    variables: { pagination, search: searchDebounced },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const pages = patentsCount ? Math.ceil(patentsCount / pagination.take) : 0;
  const page = pagination.skip / pagination.take + 1;
  const setPage = (page: number) => setPagination({ ...pagination, skip: (page - 1) * pagination.take });

  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-5 mt-5">
      <Table
        // className="min-h-[90vh] h-[90vh] max-h-[90vh]"
        isHeaderSticky
        classNames={{
          // base: 'text-red',
          wrapper: 'min-h-[90vh] h-[90vh] max-h-[90vh]',
          // table: 'grow',
        }}
        bottomContent={(
          <div className="sticky bottom-0 flex w-full items-center gap-3 justify-between">
            <Input
              labelPlacement="outside"
              className="w-1/3"
              size="sm"
              startContent={<span className="text-xl"><CiSearch/></span>}
              placeholder="Поиск"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              readOnly={isLoadingPatents}
              isClearable
              onClear={() => setSearch('')}
            />
            <Pagination
              isCompact
              showControls
              showShadow
              dotsJump={10}
              siblings={3}
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        )}
      >
        <TableHeader>
          {/*<TableColumn>№</TableColumn>*/}
          <TableColumn>Действия</TableColumn>
          <TableColumn>Номер</TableColumn>
          <TableColumn>Заголовок</TableColumn>
        </TableHeader>
        <TableBody
          loadingState={isLoadingPatents ? 'loading' : 'idle'}
          loadingContent={<Spinner/>}
          emptyContent={isLoadingPatents ? undefined : 'Нет патентов'}
        >
          {(patents ?? []).map((patent) => (
            <TableRow key={patent.id}>
              {/*<TableCell>{i + 1}</TableCell>*/}
              <TableCell>
                <ButtonGroup size="sm" isIconOnly>
                  {patent.urlGoogle && <Button as={Link} href={patent.urlGoogle} target="_blank"><FaGoogle/></Button>}
                  {patent.urlYandex && <Button as={Link} href={patent.urlYandex} target="_blank"><FaYandexInternational/></Button>}
                </ButtonGroup>
              </TableCell>
              <TableCell className="font-bold">{patent.id}</TableCell>
              <TableCell>{patent.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};