import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';
import { merge } from 'lodash';
import { refetchQueueLengthQuery, usePatentsParseMutation, usePatentsSearchMutation } from '../api/generated.ts';
import * as yup from 'yup';
import { toast } from 'sonner';

interface AddToQueueModalFC extends FC {
  open: () => void;
  close: () => void;
}

const isAddToQueueModalOpen = makeVar(false);

const urlGoogleRegex = /^https:\/\/patents\.google\.com\/patent\/([A-Z]{2})\d{3,}[A-Z0-9]*\/?(ru|en)?$/;

export const AddToQueueModal: AddToQueueModalFC = merge(() => {
  const isOpen = useReactiveVar(isAddToQueueModalOpen);
  const [parse, { loading: isLoadingParse }] = usePatentsParseMutation({
    onCompleted: () => toast.success(`Патент добавлен в очередь`) && AddToQueueModal.close(),
  });
  const [addToQueue, { loading: isLoadingSearch }] = usePatentsSearchMutation({
    onCompleted: ({ patentsSearch: count }) => toast.success(`Добавлено ${count} патентов в очередь`) && AddToQueueModal.close(),
    refetchQueries: [refetchQueueLengthQuery()],
  });
  const isLoading = isLoadingParse || isLoadingSearch;

  const [url, setUrl] = useState('');
  const [search, setSearch] = useState('');

  const [isUrlTouched, setIsUrlTouched] = useState(false);
  const [isSearchTouched, setIsSearchTouched] = useState(false);

  const urlError = !yup.string().url().isValidSync(url)
    ? 'Неверный формат ссылки'
    : !urlGoogleRegex.test(url)
      ? 'Ссылка должна вести на патент Google'
      : null;
  const searchError = !yup.string().min(3).isValidSync(search)
    ? 'Поисковый запрос должен быть не менее 3 символов'
    : null;

  const onChangeUrl: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    !isUrlTouched && setIsUrlTouched(true);
    setUrl(e.target.value);
  };
  const onChangeSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    !isSearchTouched && setIsSearchTouched(true);
    setSearch(e.target.value);
  };

  const handleParse = async () => await parse({ variables: { patentUrl: url } });
  const handleAddToQueue = async () => await addToQueue({
    variables: {
      search,
      isIgnoreExisting: true,
      isOrganisation: false,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setUrl('');
      setSearch('');
      setIsUrlTouched(false);
      setIsSearchTouched(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={AddToQueueModal.close} backdrop="blur">
      <ModalContent>
        <ModalHeader>Добавить патенты в очередь</ModalHeader>
        <ModalBody>
          <div className="flex justify-between gap-3 items-end">
            <Input
              disabled={isLoading}
              label="Ссылка"
              labelPlacement="outside"
              placeholder=" "
              onChange={onChangeUrl}
              errorMessage={isUrlTouched && urlError}
              isInvalid={isUrlTouched && !!urlError}
            />
            <Button
              disabled={isLoading}
              onClick={handleParse}
              isLoading={isLoadingParse}
            >Парсить</Button>
          </div>
          <div className="flex justify-between gap-3 items-end">
            <Input
              disabled={isLoading}
              label="Поиск"
              labelPlacement="outside"
              placeholder=" "
              onChange={onChangeSearch}
              errorMessage={isSearchTouched && searchError}
              isInvalid={isSearchTouched && !!searchError}
            />
            <Button
              disabled={isLoading}
              onClick={handleAddToQueue}
              isLoading={isLoadingSearch}
            >Добавить</Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button disabled={isLoading} onClick={AddToQueueModal.close}>Отмена</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}, {
  open: () => isAddToQueueModalOpen(true),
  close: () => isAddToQueueModalOpen(false),
});
