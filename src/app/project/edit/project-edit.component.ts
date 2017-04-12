import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser/';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../common/project.service';
import { Project } from '../common/project';
import { FormConstantsService } from '../../_services/form-constants.service';

@Component({
  selector: 'my-edit-project',
  templateUrl: 'project-edit.component.html',
  styleUrls: ['project-edit.component.css']
})

export class ProjectEditComponent implements OnInit {
  public countries: any[];
  // public project = this.initProject();
  public project: any;
  public projectForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private projectService: ProjectService,
    private fc: FormConstantsService,
    private el: ElementRef,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.getFormConstants();
    this.initForm();

    this.route.params.subscribe(params => {

      const id = params['projectId'];

      // this.imageDisplay.displayImage(id,
      //   this.projectService.retrieveImage.bind(this.projectService))
      //   .subscribe(res => this.projectImage = res.url );
      this.projectService.getProject(id)
        .subscribe(
          res => {
            debugger;
            this.project = res;
            this.fillForm();
          }, error => console.log(error)
        );
    });
  }

  private getFormConstants(): void {
    this.countries = this.fc.getCountries();
  }

  private initForm(): void {

    this.projectForm = this.fb.group({
      'projectName': [ '', [Validators.required]],
      'organizationName': [ '', [Validators.required]],
      'projectDescription': [ '', [Validators.required]],
      'remoteFlag': [ 'N', [Validators.required]],
      'address1': [ '', [Validators.required]],
      'address2': [ '', [Validators.required]],
      'city': [ '', [Validators.required]],
      'state': [ '', [Validators.required]],
      'zip': [ '', [Validators.required]],
      'country': [ '', [Validators.required]],
    });
  }

  private fillForm(): void {

    this.projectForm = this.fb.group({
      'projectName': [this.project.name || '', [Validators.required]],
      'organizationName': [this.project.organization.name || '', [Validators.required]],
      'projectDescription': [this.project.description || '', [Validators.required]],
      'remoteFlag': [this.project.remoteFlag || '', [Validators.required]],
      'address1': [this.project.address1 || '', [Validators.required]],
      'address2': [this.project.address2 || '', [Validators.required]],
      'city': [this.project.city || '', [Validators.required]],
      'state': [this.project.state || '', [Validators.required]],
      'zip': [this.project.zip || '', [Validators.required]],
      'country': [this.project.country || '', [Validators.required]],
    });
  }

  // initialize organization with blank values
  // private initProject(): any {
  //   return {
  //     'projectName': '',
  //     'organizationName': '',
  //     'projectDescription': '',
  //     'projectLocation': '',
  //     'address1': '',
  //     'address2': '',
  //     'city': '',
  //     'state': '',
  //     'zip': '',
  //     'country': ''
  //    };
  // }

   onSubmit(updatedData: any, event): void {
    event.preventDefault();
    event.stopPropagation();

      this.project.name = updatedData.projectName;
        this.project.description = updatedData.projectDescription;
       this.project.city = updatedData.city;
       this.project.country = updatedData.country;
       this.project.zip = updatedData.zip;
       this.project.organization.name = updatedData.organizationName;
       this.project.address1 = updatedData.address1;
       this.project.address2 = updatedData.address2;
       this.project.state = updatedData.state;
       this.project.remoteFlag = updatedData.remoteFlag;

    this.projectService.update(this.project).subscribe(
      res => {
        debugger;
      }, error => console.log(error)
    );
    console.log (this.project);
    }

}
