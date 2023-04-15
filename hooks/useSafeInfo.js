import { useMemo } from 'react'
import isEqual from 'lodash/isEqual'
import { useAppSelector } from '@/store'
import { defaultSafeInfo, selectSafeInfo } from '@/store/safeInfoSlice'

const useSafeInfo = () => {
  const { data, error, loading } = useAppSelector(selectSafeInfo, isEqual)

  return useMemo(
    () => ({
      safe: data || defaultSafeInfo,
      safeAddress: data?.address.value || '',
      safeLoaded: !!data,
      safeError: error,
      safeLoading: loading,
    }),
    [data, error, loading],
  )
};

export default useSafeInfo;
