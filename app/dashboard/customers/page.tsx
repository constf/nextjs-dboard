import Table from '@/app/ui/customers/table';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { fetchCustomers, fetchCustomersPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { CreateInvoice } from '@/app/ui/invoices/buttons';





export default async function Page({searchParams}: {searchParams?: {query? : string, page?: string}}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchCustomersPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={'${lusitana.className} text-2xl'}>Customers</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder='Search customers...'/>
            </div>
            <div className="w-full">
                <Suspense key={query+currentPage} fallback={<InvoicesTableSkeleton/>}>
                    <Table query={query} currentPage={currentPage}/>
                </Suspense>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
