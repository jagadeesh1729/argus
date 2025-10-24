import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  companyNameState,
  shortCompanyNameState,
  contractorNameState,
} from '../recoil/state/formState';

type Incoming = Partial<{
  companyName: string;
  shortCompanyName: string;
  contractorName: string;
  contractName: string; // alias for contractorName
  company: string; // alias for companyName
  company_short: string; // alias for shortCompanyName
}>;

/**
 * Reads names from a JSON URL provided via query param and hydrates Recoil.
 * Supported query keys: `namesUrl`, `dataUrl`, `link`.
 * Expected JSON shape: { companyName, shortCompanyName, contractorName }
 * Also supports alias keys listed in Incoming.
 */
export default function useNamesFromLink() {
  const setCompanyName = useSetRecoilState(companyNameState);
  const setShortCompanyName = useSetRecoilState(shortCompanyNameState);
  const setContractorName = useSetRecoilState(contractorNameState);

  const { search } = useLocation();
  const loadedForUrl = useRef<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const url = params.get('namesUrl') || params.get('dataUrl') || params.get('link');
    if (!url) return;

    // Avoid refetching for the same URL
    if (loadedForUrl.current === url) return;
    loadedForUrl.current = url;

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Incoming = await res.json();

        const companyName = data.companyName || data.company || '';
        const shortCompany = data.shortCompanyName || data.company_short || '';
        const contractName = data.contractorName || data.contractName || '';

        if (companyName) setCompanyName(companyName);
        if (shortCompany) setShortCompanyName(shortCompany);
        if (contractName) setContractorName(contractName);
      } catch (e) {
        // Silently ignore fetch/parse errors to avoid breaking the UI
        // eslint-disable-next-line no-console
        console.warn('[useNamesFromLink] Failed to load names from link:', e);
      }
    })();
  }, [search, setCompanyName, setShortCompanyName, setContractorName]);
}

