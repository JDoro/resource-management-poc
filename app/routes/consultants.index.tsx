import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchConsultants } from '../temp/api/mock-api';

export const Route = createFileRoute('/consultants/')({
  component: ConsultantsListComponent,
  loader: async () => {
    const consultants = await fetchConsultants();
    return { consultants };
  },
});

function ConsultantsListComponent() {
  const loaderData = Route.useLoaderData();
  const consultants = loaderData.consultants;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-dark-grey mb-4">
          All Consultants
        </h2>
        <p className="text-dark-grey/70 mb-6">
          Browse our team of {consultants.length} consultant{consultants.length !== 1 ? 's' : ''}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultants.map((consultant) => (
            <Link
              key={consultant.id}
              to="/consultants/$id"
              params={{ id: consultant.id }}
              className="bg-gradient-to-br from-light-blue/30 to-light-grey/50 rounded-lg p-6 border border-light-blue hover:border-primary hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-dark-grey mb-2 hover:text-primary transition-colors">
                  {consultant.name}
                </h3>
                <p className="text-dark-grey/70 mt-auto">
                  {consultant.years_employed} {consultant.years_employed === 1 ? 'year' : 'years'} employed
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
