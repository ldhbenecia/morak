import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/queries';
import { useJoinGroupQuery, useLeaveGroupQuery } from '@/queries/hooks/group';

import { Modal } from '../../Modal';

export const useGroupJoinAndLeave = () => {
  const { mutate: leaveGroup } = useLeaveGroupQuery();
  const { mutate: joinGroup } = useJoinGroupQuery();

  const { data: myGroup } = useQuery({
    ...queryKeys.group.myGroup(),
    staleTime: Infinity,
  });

  const joinedGroupId = myGroup?.[0]?.id;

  const handleJoin = (id: string) => {
    if (joinedGroupId) {
      leaveGroup(joinedGroupId);
    }
    joinGroup(id);
  };

  const handleLeave = (id: string) => {
    leaveGroup(id);
  };

  // const onClickLeave = () => {
  //   openModal(
  //     <Modal
  //       title="그룹에서 나가시겠습니까?"
  //       buttonType="double"
  //       onClickConfirm={handleGroupJoinAndLeave}
  //     />,
  //   );
  // };

  return { handleLeave, handleJoin };
};
