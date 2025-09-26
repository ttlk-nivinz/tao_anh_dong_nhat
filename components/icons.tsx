
import React from 'react';

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.077-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.813 15.904 1.032 3.527 3.527-1.032-.006-.006a1.5 1.5 0 0 1 1.99 1.99l-.006.006-1.032 3.527 3.527-1.032.006-.006a1.5 1.5 0 0 1 1.99 1.99l-.006.006-1.032 3.527 3.527-1.032.006-.006a1.5 1.5 0 0 1 1.99 1.99l-.006.006L15.904 9.812m-2.122-2.122L15.904 9.812a1.5 1.5 0 0 1-1.99-1.99l.006-.006 1.032-3.527-3.527 1.032-.006.006a1.5 1.5 0 0 1-1.99-1.99l.006-.006 1.032-3.527-3.527 1.032-.006.006a1.5 1.5 0 0 1-1.99-1.99l.006-.006L9.812 7.69m-2.122-2.122L7.69 9.812a1.5 1.5 0 0 1-1.99 1.99l-.006-.006-1.032-3.527 3.527 1.032.006.006a1.5 1.5 0 0 1 1.99 1.99l-.006.006-1.032 3.527 3.527 1.032.006.006a1.5 1.5 0 0 1 1.99 1.99l-.006.006L7.69 14.096m-2.122 2.122L9.812 14.096a1.5 1.5 0 0 1 1.99 1.99l-.006.006-1.032 3.527 3.527-1.032.006-.006a1.5 1.5 0 0 1 1.99 1.99l-.006.006-1.032 3.527 3.527-1.032.006-.006a1.5 1.5 0 0 1 1.99 1.99l-.006.006L14.096 9.812" />
  </svg>
);

export const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );

export const Spinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-100"></div>
);
