import { JobCategory } from '../../shared/models/enums';

export class JobTitle {
  id!: number;
  name!: string;
  description!: string;
  responsibilities!: string;
  skills!: string;
  jobCategory!: JobCategory;
  from!: Date;
  to!: Date;
  maximumApplications!: number;
  canSubmit!: boolean;
}
